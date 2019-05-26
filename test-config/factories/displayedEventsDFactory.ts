export function displayedEventsDFactory(dateLimit: string) {
    return [
        {
            label: 'label',
            items: [
                {
                    itemCategory: '',
                    location: '',
                    trimmedDescription: '',
                    startDate: dateLimit,
                    endDate: dateLimit,
                    title: '',
                    guid: '',
                    hidden: false
                }
            ]
        }
    ];
}
