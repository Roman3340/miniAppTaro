import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

interface PlaceAutocompleteProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  apiKey: string;
  disabled?: boolean;
  className?: string;
}

declare global {
  interface Window {
    google: any;
  }
}

const PlaceAutocomplete: React.FC<PlaceAutocompleteProps> = ({
  label,
  value,
  onChange,
  apiKey,
  disabled = false,
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Загружаем скрипт Google Maps Places API, если ещё не загружен
  useEffect(() => {
    if (!window.google && !scriptLoaded && !disabled) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=ru`;
      script.async = true;
      script.onload = () => {
        setScriptLoaded(true);
      };
      document.head.appendChild(script);
    } else if (window.google) {
      setScriptLoaded(true);
    }
  }, [apiKey, scriptLoaded, disabled]);

   useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }
  }, [value]);

  // Инициализируем autocomplete после загрузки скрипта
  useEffect(() => {
    if (scriptLoaded && inputRef.current && !disabled) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["(cities)"],
        fields: ["formatted_address", "name"],
      });

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        const address = place?.formatted_address || place?.name || "";
        // принудительно обновим и DOM-значение
        if (inputRef.current) {
          inputRef.current.value = address;
        }
        onChange(address);
      });
    }
  }, [scriptLoaded, disabled]);

 



  return (
    <label className={styles.label}>
      {label}
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Введите город"
        className={`${styles.input} ${className}`}
      />
    </label>
  );
};

export default PlaceAutocomplete;

