const TransactionItem = () => {
  return (
    <div className="w-full bg-white rounded-lg px-5 py-4 flex justify-between">
      <div className="w-full gap-3 flex items-center">
        <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-b from-[#C46DDB] to-[#6F33E7]"></div>
        <p className="text-base leading-[100%]">Food</p>
      </div>
      <div className="flex text-nowrap flex-col gap-1.5 items-end">
        <p>-$45.00</p>
        <p className="text-light-gray-text">Today</p>
      </div>
    </div>
  );
};

export default TransactionItem;
