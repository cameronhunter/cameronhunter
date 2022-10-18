beforeEach(() => {
    mockDebug.output = [];
});

function mockDebug(namespace?: string) {
    function log(message: string) {
        mockDebug.output.push(`${namespace} ${message}`);
    }

    log.extend = (additionalNamespace: string) => {
        return mockDebug([namespace, additionalNamespace].filter(Boolean).join(':'));
    };

    return log;
}

mockDebug.output = [] as string[];

export default mockDebug;
