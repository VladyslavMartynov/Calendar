import moment, { Moment } from "moment";

type RequiredType = {
    required: boolean,
    message: string
}

export const rules = {
    require: (message: string = "Required field"): RequiredType => ({
        required: true,
        message: message
    }),
    isDateAfter: (message: string) => ({
        validator(_ : any, value: Moment) {
            if (value.isSameOrAfter(moment())) {
                return Promise.resolve();
            }
            return Promise.reject(new Error(message));
        }
    })
}