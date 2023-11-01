interface HandProps {
  rotation: number;
  type: 'hour' | 'minute' | 'second';
}

function Hand({
  rotation,
  type
}: HandProps) {
  const handClassName = `${type}-hand`;

  return <div className={handClassName} style={{ transform: `rotate(${rotation}deg)` }}></div>;
};

export default Hand;