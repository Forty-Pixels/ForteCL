/** Prefer the editable amount while preserving prices on older packages. */
export function getPackagePricing(title: string, amount?: number | null) {
    const match = title.match(/(?:[—–-]\s*)?AED\s*([\d,]+(?:\.\d+)?)/i);
    const value = amount ?? (match ? Number(match[1].replaceAll(',', '')) : null);
    return {
        cleanTitle: match ? title.replace(match[0], '').trim() : title,
        price: value !== null && Number.isFinite(value)
            ? `AED ${value.toLocaleString('en-AE', { maximumFractionDigits: 2 })}`
            : null,
    };
}
