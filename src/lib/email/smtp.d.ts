declare type EmailData = {
    Host?: string,
    Username?: string,
    Password?: string,
    SecureToken?: string,
    To: string,
    From: string,
    Subject: string, 
    Body: string,
    Attachments: EmailAttachment[]
};

declare type EmailAttachment = {
    name: string, 
    path: string
}

declare type XMLHttpRequest = any;

export function send(a: EmailData): Promise<any>;
export function ajaxPost(e: any, n: any, t: any): void;
export function ajax(e: any, n: any): void;
export function createCORSRequest(e: any, n: any): XMLHttpRequest;