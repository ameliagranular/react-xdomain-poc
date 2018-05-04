export interface ILocaleMessages {
    [index: string]: string | ILocaleMessages;
}

export interface IIntlMessages {
    [index: string]: ILocaleMessages;
}
