import React, { FormEvent } from "react"
import { useState } from "react"

type TodoInsertProps = {
    onInsert: (text: string) => void
}

const TodoInsert = ({ onInsert }: TodoInsertProps) => {
    const [value, setValue] = useState("");
    const OnSubmit = (e: FormEvent) => {
        e.preventDefault();
        onInsert(value);
        setValue("");
    }


    return (
        <form onSubmit={OnSubmit}>
            <input
                placeholder="할 일을 입력해주세요"
                value={value}
                type="text" />
            <button type="button"></button>
        </form>
    )
}