import { Oval } from "react-loader-spinner";

export default function Loading() {
  return (
    <Oval
      height={80}
      width={80}
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={3}
      strokeWidthSecondary={3}
    />
  );
}
