
import React, { ChangeEvent, useState } from "react"
import { ObjectType } from "typescript"

let patternModel: { [key: string]: RegExp } = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: /(84|0[3|5|7|8|9])+([0-9]{8})/,
    url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    username: /^[A-Za-z0-9]{6,20}$/,
    password: /^[A-Za-z0-9]{6,20}$/,
    tax: /^[0-9]*$/,
}
type RuleItem = {
    min?: number,
    max?: number,
    required?: true,
    pattern?: RegExp | 'email' | 'phone' | 'url' | 'username' | 'password' | 'tax',
    confirm?: string,
    check?: boolean
}

type RuleState<T extends Object> = Partial<{
    [key in keyof T]: RuleItem
}>

type MessageState<T extends Object> = Partial<{
    [k in keyof T]: {
        [k in keyof RuleItem]: string
    }
}>

type ErrorState<T extends Object> = Partial<{
    [key in keyof T]: string
}>

type UseFormReturn<T> = {
    register: (name: keyof T, rule?: RuleItem, message?: any) => {
        name: keyof T,
        onChange: (event: any) => void,
        value: string
    },
    handleSubmit: Function,
    form: T,
    error: ErrorState<T>,
    setForm: React.Dispatch<T>
}

type OptionType = {
    preCheck?: Function,

}



export function useForm<T extends Object>(initvalue = {}, option: OptionType = {}): UseFormReturn<T> {
    // console.log(initvalue)
    let [form, setForm] = useState<any>(initvalue || {})
    let [error, setError] = useState<ErrorState<T>>({})
    let [initRule] = useState<RuleState<T>>({})
    let [initMessage] = useState<MessageState<T>>({})

    // console.log(form)

    function inputChange(ev: ChangeEvent<HTMLInputElement>) {
        let name = ev.currentTarget.name
        let value = ev.currentTarget.value

        // form[name] = value
        if (ev.currentTarget.getAttribute('type') === 'checkbox') {
            if (value && value !== 'true' && value !== 'false') {
                form[name] = ev.currentTarget.checked ? value : ''
            } else {
                form[name] = ev.currentTarget.checked
                // console.log(value)
            }

        }
        else if (ev.currentTarget.getAttribute('type') === 'file') {
            form[name] = ev.currentTarget.files?.[0]
            // console.log('avatar: ', form[name])
        }
        else {
            form[name] = value
        }
        
        setForm({ ...form })
    }



    function check() {
        let errorObj: any = {}
        option?.preCheck?.(initRule)
        console.log(initRule)
        for (let i in initRule) {
            let r = initRule[i]
            if (r?.required && !form[i]?.trim()) {
                errorObj[i] = initMessage?.[i]?.required || 'Trường này không được để trống'
                continue
            }
            if (r?.pattern) {
                let pattern = r.pattern
                if (patternModel[r.pattern as string]) {
                    pattern = patternModel[r.pattern as string]
                }
                if (form[i] && !(pattern instanceof RegExp && pattern.test(form[i]))) {
                    errorObj[i] = initMessage?.[i]?.pattern || 'Trường này không đúng định dạng'
                }
            }
            if (r?.min && form[i]?.length < r.min) {
                errorObj[i] = initMessage?.[i]?.min || `Trường này phải dài hơn ${r.min} ký tự`
            }
            if (r?.max && form[i]?.length > r.max) {
                errorObj[i] = initMessage?.[i]?.max || `Trường này không được nhiều hơn ${r.max} ký tự`
            }
            if (r?.confirm && form[r.confirm] !== form[i]) {
                errorObj[i] = initMessage?.[i]?.confirm || `Vui lòng điền giông ${r.confirm}`
            }
        }

        for (let i in initRule) {
            let r = initRule[i]

            if (typeof r?.check !== 'undefined' && !r.check) {
                delete errorObj[i]
            }

        }

        return errorObj
    }

    function register(name: keyof T, rule?: RuleItem, message?: any) {
        if (!form[name]) {
            form[name] = ''
        }
        // console.log(form)
        if (rule) {
            initRule[name] = rule
        }
        if (message) {
            initMessage[name] = message
        }
        if (form[name] instanceof Blob) {
            return {
                name,
                onChange: inputChange, 
                
            } as any
        }

        return {
            name,
            onChange: inputChange,
            value: form[name] 
        }
    }
    function handleSubmit(callback: Function) {
        return (ev: any) => {
            let errorObject = check()
            ev.preventDefault()

            if (Object.keys(errorObject).length === 0) {
                callback(form)
            }

            setError(errorObject)
        }
    }

    return {
        setForm,
        register,
        handleSubmit,
        form,
        error
    }
}