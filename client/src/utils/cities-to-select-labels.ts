interface City {
    id: string;
    name: string;
    state: string;
}

export interface SelectLabels {
    label: string;
    value: string;
}

export function citiesToSelectLabels(cities: City[]): SelectLabels[] {
    let labels: SelectLabels[] = [];

    cities.map((city) => labels.push({
        label: city.name,
        value: city.id
    }))

    return labels
}