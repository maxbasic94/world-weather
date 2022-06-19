import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactDom from 'react-dom';

import { getSimilarCities } from '../../helpers/getSimilarCities';
import { SearchCity } from '../../types/types';

import './SearchCityModalWindow.scss';

interface SearchCityModalWindowProps {
  open: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
  citiesList: string[];
  setCitiesLits: Dispatch<React.SetStateAction<string[]>>;
}
export const SearchCityModalWindow: React.FC<SearchCityModalWindowProps> = ({
  open,
  onOpen,
  citiesList,
  setCitiesLits,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false);
  const [isCyrillic, setIsCyrillic] = useState(false);
  const [isWrongCity, setIsWrongCity] = useState(false);

  useEffect(() => {
    open && setInputError(false);
  }, [open]);

  const handleOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsCyrillic(/[а-я]/i.test(event.target.value));
    event.target.value.length > 0 && !isCyrillic ? setInputError(false) : setInputError(true);
  };

  const handleOnClickClear = () => {
    setInputValue('');
    setInputError(true);
  };

  const handleOnClickCancel = () => {
    onOpen(false);
  };

  const handleOnClickAdd = async () => {
    getSimilarCities(inputValue).then((cityExistsList: SearchCity[]) => {
      if (cityExistsList[0].name.toLocaleLowerCase() !== inputValue.toLocaleLowerCase()) {
        setIsWrongCity(true);
        setInputError(true);
      } else {
        setIsWrongCity(false);
        setInputError(false);
        if (citiesList.includes(inputValue)) {
          onOpen(false);
        } else {
          setCitiesLits((prev) => [...prev, inputValue.toLocaleLowerCase()]);
          onOpen(false);
        }
      }
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
              className={inputError ? 'Modal-Input_searchCity_error' : 'Modal-Input_searchCity'}
              type="text"
              placeholder="Search city"
              value={inputValue}
              onChange={handleOnChange}
            />
          </div>
          <div className={inputError ? 'Modal-InputDescription_error' : 'Modal-InputDescription '}>
            {isCyrillic ? 'choose language' : isWrongCity ? 'unknown city' : 'choose a city'}
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
