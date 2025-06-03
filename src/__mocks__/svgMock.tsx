const SvgMock = ({ className = '', ...props }: { className?: string }) => (
    <div data-testid="svg-mock" className={className} {...props} />
)

export default SvgMock
