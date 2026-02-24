const items = [
    'PRERIT SIWACH',
    '•',
    'FULL STACK DEVELOPER',
    '•',
    'MERN STACK',
    '•',
    'JAVA SPRING BOOT',
    '•',
    'AWS CLOUD',
    '•',
    'REACT.JS',
    '•',
    'NODE.JS',
    '•',
];

export default function Marquee() {
    const track = [...items, ...items, ...items];

    return (
        <div className="marquee">
            <div className="marquee__track">
                {track.map((item, i) => (
                    <span className="marquee__item" key={i}>{item}</span>
                ))}
            </div>
        </div>
    );
}
