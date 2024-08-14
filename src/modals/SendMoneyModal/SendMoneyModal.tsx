import { Modal } from "@deriv-com/ui";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useBalance, useTransactions } from "../../hooks";

/**
 * 1. This is where the props are typed. Any new props, it needs to be added here.
 */
type SendMoneyModalProps = {
  isSendOpen: boolean;
  handleClose: VoidFunction;
};

/**
 * 1. Modal component has an isOpen props. isOpen needs to be passed to trigger the modal.
 * 2. To trigger the modal, a state is needed. State needs to be passed from parent.
 * 3. Added a prop called isOpen but since this is TypeScript, props need to be typed. Any new props, it needs to be added.
 */
export const SendMoneyModal = ({
  isSendOpen,
  handleClose,
}: SendMoneyModalProps) => {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  const { subtractBalance } = useBalance();

  const { handleTransactions } = useTransactions();

  const handleSubmit = () => {
    subtractBalance(Number(amount));
    handleTransactions(Number(amount), address, "send");
  };

  return (
    <Modal
      className="w-[400px] h-auto text-black rounded-lg p-[15px] gap-5"
      isOpen={isSendOpen}
      ariaHideApp={false}
    >
      <div className="flex justify-between items-center font-bold">
        <div>Transfer</div>
        <IoClose className="cursor-pointer" size={20} onClick={handleClose} />
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div>
          <p className="text-sm">Transfer Amount</p>
          <input
            className="p-2 w-full border-gray-300 rounded-md border border-solid"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <p className="text-sm">Transfer Receipient</p>
          <input
            className="p-2 w-full border-gray-300 rounded-md border border-solid"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            type="submit"
            className="p-2 w-full rounded-lg bg-red-600 text-sm font-bold text-center cursor-pointer text-white"
          >
            Send
          </button>
        </div>
      </form>
    </Modal>
  );
};
