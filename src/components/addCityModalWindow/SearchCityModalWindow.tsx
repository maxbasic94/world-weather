import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import './SearchCityModalWindow.scss';

interface SearchCityModalWindowProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  setCitiesLits?: Dispatch<React.SetStateAction<string[]>>;
}

async function getSimilarCities(searchCity: string) {
  const response = await fetch(
    `https://autocomplete.travelpayouts.com/places2?term=${searchCity}&locale=en&types[]=city&callback=json`,
    { mode: 'cors' }
  );
  if (response.status == 200) {
    const text = await response.text();
    return JSON.parse(text.slice(5).slice(0, -2));
  }
}

export const SearchCityModalWindow: React.FC<SearchCityModalWindowProps> = ({ open, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false);
  const [isCyrillic, setIsCyrillic] = useState(false);

  useEffect(() => {
    open && setInputError(false);
  }, [open]);

  const handleOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsCyrillic(/[а-я]/i.test(event.target.value));
    event.target.value.length > 0 && !isCyrillic ? setInputError(false) : setInputError(true);
    console.log(test);
  };

  const handleOnClickClear = () => {
    setInputValue('');
    setInputError(true);
  };

  const handleOnClickCancel = () => {
    onClose(false);
  };

  const handleOnClickAdd = async () => {
    const isCityExists = await getSimilarCities(inputValue);
    isCityExists.forEach((city: { name: string }) => {
      city.name === inputValue;
      console.log(true);
    });
  };

  return ReactDom.createPortal(
    !open ? null : (
      <>
        <div className="Modal-Overlay" />
        <div className="Modal-Container">
          <div className="Modal-Caption">Choose a city</div>
          <div className="Modal-Description">
            To find city start typing and pick one from the suggestions
          </div>
          <div className="Modal-InputContainer">
            <input
              className="Modal-Input_searchCity"
              type="text"
              placeholder="Search city"
              value={inputValue}
              onChange={handleOnChange}
            />
          </div>
          <div className={inputError ? 'Modal-InputDescription_error' : 'Modal-InputDescription '}>
            {isCyrillic ? 'choose language' : 'choose a city'}
          </div>
          <div className="Modal-ButtonsContainer">
            <div className="Modal-ButtonClear_container">
              <button className="Modal-Button_clear" onClick={handleOnClickClear}>
                CLEAR
              </button>
            </div>
            <div className="Modal-ButtonCancelAndAdd_container">
              <button className="Modal-Button_cancel" onClick={handleOnClickCancel}>
                CANCEL
              </button>
              <button className="Modal-Button_add" onClick={handleOnClickAdd}>
                ADD
              </button>
            </div>
          </div>
        </div>
      </>
    ),
    document.querySelector('#portal') as HTMLElement
  );
};
