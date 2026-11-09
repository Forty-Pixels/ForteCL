import { useState } from 'react';
import { useClient, type DocumentActionComponent } from 'sanity';

type ContentDocument = Record<string, unknown> & { _id: string; _rev: string };

const SYSTEM_FIELDS = new Set(['_id', '_type', '_rev', '_createdAt', '_updatedAt']);

function removeReferences(value: unknown, ids: Set<string>): [unknown, boolean] {
    if (Array.isArray(value)) {
        let changed = false;
        const result = value.flatMap(item => {
            if (isTargetReference(item, ids)) {
                changed = true;
                return [];
            }
            const [next, itemChanged] = removeReferences(item, ids);
            changed ||= itemChanged;
            return [next];
        });
        return [changed ? result : value, changed];
    }

    if (value && typeof value === 'object') {
        let changed = false;
        const result: Record<string, unknown> = {};
        for (const [key, item] of Object.entries(value)) {
            if (isTargetReference(item, ids)) {
                changed = true;
                continue;
            }
            const [next, itemChanged] = removeReferences(item, ids);
            changed ||= itemChanged;
            result[key] = next;
        }
        return [changed ? result : value, changed];
    }

    return [value, false];
}

function isTargetReference(value: unknown, ids: Set<string>): boolean {
    return !!value && typeof value === 'object' && !Array.isArray(value)
        && '_ref' in value && typeof value._ref === 'string' && ids.has(value._ref);
}

export const DeleteWithReferencesAction: DocumentActionComponent = ({ id, draft, published, onComplete }) => {
    const client = useClient({ apiVersion: '2025-02-19' });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const deleteDocument = async () => {
        setDeleting(true);
        try {
            const publishedId = id.replace(/^drafts\./, '');
            const draftId = `drafts.${publishedId}`;
            const ids = new Set([publishedId, draftId]);
            const referring = await client.fetch<ContentDocument[]>(
                '*[_id != $publishedId && _id != $draftId && (references($publishedId) || references($draftId))]',
                { publishedId, draftId },
                { perspective: 'raw' },
            );

            // Commit in batches so heavily used categories can still be removed.
            for (let index = 0; index < referring.length; index += 100) {
                let transaction = client.transaction();
                for (const document of referring.slice(index, index + 100)) {
                    const set: Record<string, unknown> = {};
                    const unset: string[] = [];
                    for (const [key, value] of Object.entries(document)) {
                        if (SYSTEM_FIELDS.has(key)) continue;
                        if (isTargetReference(value, ids)) {
                            unset.push(key);
                            continue;
                        }
                        const [next, changed] = removeReferences(value, ids);
                        if (changed) set[key] = next;
                    }
                    if (Object.keys(set).length || unset.length) {
                        transaction = transaction.patch(document._id, patch => {
                            patch = patch.ifRevisionId(document._rev);
                            if (Object.keys(set).length) patch = patch.set(set);
                            if (unset.length) patch = patch.unset(unset);
                            return patch;
                        });
                    }
                }
                await transaction.commit();
            }

            const deletion = client.transaction();
            if (draft) deletion.delete(draftId);
            if (published) deletion.delete(publishedId);
            await deletion.commit();
            setDialogOpen(false);
            onComplete();
        } catch (error) {
            window.alert(`Could not delete document: ${error instanceof Error ? error.message : 'Please try again.'}`);
        } finally {
            setDeleting(false);
        }
    };

    return {
        label: 'Delete',
        tone: 'critical',
        disabled: deleting || (!draft && !published),
        onHandle: () => setDialogOpen(true),
        dialog: dialogOpen ? {
            type: 'confirm',
            color: 'danger',
            message: 'Delete this document and remove it from every other document that references it?',
            onCancel: () => setDialogOpen(false),
            onConfirm: deleteDocument,
        } : null,
    };
};
