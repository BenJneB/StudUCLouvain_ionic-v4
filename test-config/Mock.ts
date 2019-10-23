export function getMockProvider(service, newMockService) {
    return {
        provide: service, useFactory: () => {
            return newMockService();
        }
    };
}