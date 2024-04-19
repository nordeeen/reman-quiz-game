import { FC, ReactElement, useContext } from 'react';
import { TopicsContext } from '../../../chooseTopic/Topics';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ModalEnteredName: FC<ModalProps> = ({
  isOpen,
  onClose,
  handleChange,
  handleSubmit,
}): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { formData } = useContext(TopicsContext)!;
  const isDisable = formData?.trim() === '';

  return (
    <div
      className={`modal ${
        isOpen ? 'block' : 'hidden'
      } fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-50`}
    >
      <div className="modal-dialog mx-auto max-w-80 mt-20">
        <div className="modal-content bg-white rounded shadow-lg">
          <div className="modal-header py-3 px-4 border-b flex justify-end">
            <button onClick={onClose} className="ml-auto">
              <span className="block text-red-700 font-bold text-2xl">X</span>
            </button>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  id="input"
                  value={formData}
                  onChange={handleChange}
                  placeholder="enter your name here"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-black text-center"
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  disabled={isDisable}
                  style={{ background: isDisable ? 'lightgreen' : '#004225' }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEnteredName;
