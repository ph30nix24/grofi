'use client'

interface ButtonProps {
    text: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    extraClasses?: string;
    link?: string;
}

export default function Button({ text, icon, onClick, extraClasses = "", link }: ButtonProps) {
    if (link) {
        return (
            <a href={link} className={`${extraClasses} px-8 py-3 rounded-lg flex gap-2 w-fit items-center`}>
                <span>{text}</span>
                {icon}
            </a>
        );
    }

    return (
        <button className={`${extraClasses} px-6`} onClick={onClick}>
            <span>{text}</span>
            {icon}
        </button>
    );
}