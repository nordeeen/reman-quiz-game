import { FC, ReactElement, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalEnteredName from '../quizGame/comps/modal/ModalInput';
import avatarBackground from '../../assets/images/background-avatar.jpg';

export interface TopicsContextType {
  formData: string;
  setFormData: React.Dispatch<React.SetStateAction<string>>;
}

export const TopicsContext = createContext<TopicsContextType | null>(null);

const Topics: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<string>('');

  const onCloseModal = () => {
    setModalOpen(false);
    setFormData('');
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
    localStorage.setItem('user', e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/play')
    onCloseModal();
  };

  return (
    <>
      <TopicsContext.Provider value={{ formData, setFormData }}>
        <div
          className="main-container"
          style={{
            backgroundImage: `url(${avatarBackground})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <div style={{ paddingTop: '100px' }}>
            <div className="mt-[10vh] tracking-[2px] text-[#111]">
              <div className="bg-[#FF725E] p-1 rounded-xl">
                <p className="text-quiz drop-shadow">
                  Seberapa tahukah anda tentang Islam?
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                className="start-btn shadow-2xl"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Start
              </button>
            </div>
            {/* ---- Modal ----- */}
            <ModalEnteredName
              isOpen={modalOpen}
              onClose={onCloseModal}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </TopicsContext.Provider>
    </>
  );
};

export default Topics;
