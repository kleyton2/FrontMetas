interface ErrorMessageProps {
  message: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <div className="text-red-500 text-sm mb-2">{message}</div>
}

export default ErrorMessage
