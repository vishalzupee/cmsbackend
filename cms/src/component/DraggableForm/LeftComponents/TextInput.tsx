'use client';
import React, {useState} from 'react'

type textInputProps = {
    className?: string;
    draggable?: string;
    name?:string;
    type?:string;
    label?:string;
    id?: number;
}

export default function TextInput({ id, name, type, label, className = '', draggable }: textInputProps) {
    const joinedClass = ['input__field__wrapper', className].join(' ');

    return (
        <>
            <div key={id} className={joinedClass} draggable={draggable}>
                <div className='label__field__label'>{label}</div>
                <div className='input__field_area'>
                    <input type={type} className='input_type_field' name={name} />
                </div>
            </div>
        </>
    )
}
