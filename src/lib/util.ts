export function log(message: string, severity: string, source: string) {
    console.log(`[${new Date().toLocaleString('en-US')}] [${severity.toUpperCase()}] [${source}]  ${message}`);
}