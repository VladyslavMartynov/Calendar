type RequiredType = {
    required: boolean,
    message: string
}

export const rules = {
    require: (message:string): RequiredType => ({
        required: true,
        message: message
    })
}