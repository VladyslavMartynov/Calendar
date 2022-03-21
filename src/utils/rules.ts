type RequiredType = {
    required: boolean,
    message: string
}

export const rules = {
    require: (message: string = "Required field"): RequiredType => ({
        required: true,
        message: message
    })
}