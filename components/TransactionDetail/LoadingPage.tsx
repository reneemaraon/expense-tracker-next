import CustomButton from "@/components/common/Button";

export const LoadingDetailBox = () => (
  <div className="w-full">
    <div className="bg-white w-full relative max-w-[500px] rounded-lg h-14 px-6 py-1.5 items-center gap-5 flex"></div>
  </div>
);

const TransactionDetailLoading = () => {
  return (
    <div className="h-screen w-full center-col gap-24 py-16">
      <div className="center-col gap-10 w-full">
        <div className="center-col gap-8">
          <p className="text-xl leading-[120%] font-bold text-transparent bg-slate-100">
            Transaction Detail
          </p>
          <div className="w-full center-col gap-2">
            <div className="w-[280px] px-4 bg-white h-[72px] rounded-full flex items-center"></div>
          </div>
          <div className="w-full max-w-[400px] center-col gap-5">
            <LoadingDetailBox />
            <LoadingDetailBox />
            <LoadingDetailBox />
          </div>
        </div>
        {/* <div className="center-col gap-5 w-full">
          <CustomButton>Edit</CustomButton>
          <CustomButton styleSet="dark">Delete</CustomButton>
        </div> */}
      </div>
    </div>
  );
};

export default TransactionDetailLoading;
