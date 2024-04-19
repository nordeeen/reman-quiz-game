const ToastWarning = ({ message }: { message: string }) => {
  return (
    <div className="w-[200px] fixed top-1/1 right-1/1 m-4 bg-red-500 text-white py-2 px-4 rounded-md shadow-lg animate-slide-in-down">
      <p className="text-center text-base font-serif font-semibold">{message}</p>
    </div>
  );
};

export default ToastWarning;
