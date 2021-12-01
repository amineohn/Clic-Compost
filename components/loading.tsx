const Loading = ({ message }) => {
  return (
    <div className="flex space-x-1">
      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
      <span>{message}</span>
    </div>
  );
};
export default Loading;
