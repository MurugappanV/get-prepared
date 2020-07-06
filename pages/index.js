import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
    () => import('../components/Editor'),
    { ssr: false }
)

export default function Main() {
    return (
        <div style={{padding: "40px", background: "rgb(245,246,247)",
        background: "linear-gradient(90deg, rgba(245,246,247,1) 0%, rgba(255,255,255,1) 48%, rgba(245,246,247,1) 100%)"}}>
            <DynamicComponentWithNoSSR/>
        </div>
    )
}