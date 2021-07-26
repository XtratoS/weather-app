export default function WindDirectionIcon(props: {size?: string, style?: React.CSSProperties}) {
  return (
    <svg
      version="1.1"
      viewBox="0 0 28 32"
      width={props.size || '24'}
      height={props.size || '24'}
      style={{...props.style}}
    >
    <path
      d="m 0.07190368,30.791541 c -0.30893429,0.71382 0.43398403,1.42929 1.15515192,1.11249 l 12.7707924,-8.45665 12.774019,8.47497 c 0.721158,0.31796 1.465245,-0.3975 1.156308,-1.11182 L 14.812065,0.48688103 c -0.304686,-0.72668 -1.362319,-0.56651 -1.615607,-8.6e-4 z"
    />
    </svg>
  )
}
