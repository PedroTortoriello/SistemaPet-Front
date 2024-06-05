import React from 'react';

interface ButtonProps {
    name: string;
    id: string;
    type: "button" | "submit" | "reset";
    content?: string; // Deixe `content` opcional, caso `children` seja usado
    link: string;
    target: string;
    p: string;
    span: string;
    disabled?: boolean; // Adicionar `disabled` como opcional
    children?: React.ReactNode; // Adicionar `children` como opcional
}

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <div className="button-box">
            <button className="button" name={props.name} id={props.id} type={props.type} disabled={props.disabled}>
                {props.content || props.children}
            </button>
            <a href={props.link} target={props.target}>
                <p>{props.p}<span> {props.span}</span></p>
            </a>
        </div>
    );
}

export default Button;
