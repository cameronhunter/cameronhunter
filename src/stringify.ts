export default function stringify(input: unknown): string {
    if (input === null) {
        return 'null';
    }

    if (typeof input === 'function') {
        return input.name ? `Function<${input.name}>` : 'Function';
    }

    if (typeof input === 'object' && input.constructor.name !== 'Object') {
        return `Instance<${input.constructor.name}>`;
    }

    return JSON.stringify(input);
}
