type ContainerProps = {
    children: React.ReactNode
}

export default function Container({children}: ContainerProps) {
    return (
        <div className="container mx-auto max-w-7xl">
            {children}
        </div>
    );
}