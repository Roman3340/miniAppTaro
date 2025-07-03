// import { useState } from 'react';
// import styles from "./styles.module.css";
// import { generateChart } from '../../api/GetChart';
// import type { ChartResponse } from '../../api/GetChart';


// const NatalChartPage = () => {
//   const [chartData, setChartData] = useState<ChartResponse | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const handleGenerateChart = async () => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       // Пример данных - замените на реальные данные из формы
//       const data = {
//         telegram_id: 665444333,
//         name: "Роман",
//         date_year: 2004,
//         date_month: 2,
//         date_day: 10,
//         date_hour: 9,
//         date_min: 35,
//         location_lat: 55.7558,
//         location_lon: 83.6176,
//         location_utc_offset: "+06:00"
//       };
      
//       const response = await generateChart(data);
//       setChartData(response);
//       setIsPopupOpen(true);
//     } catch (err) {
//       setError('Ошибка при генерации карты');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles.natalPage}>
//       <div className={styles.title}>Твоя натальная карта</div>
//       <div className={styles.buttonBlock}>
//         <button 
//           className={styles.button}
//           onClick={handleGenerateChart}
//           disabled={isLoading}
//         >
//           {isLoading ? 'Расшифровка...' : 'Расшифровать натальную карту 🔮'}
//         </button>
//       </div>
      
//       {error && <div className={styles.error}>{error}</div>}
      
//       <div className={styles.natalChart}>
//         {chartData ? (
//           <img 
//             src={`${chartData.chart_image}`} 
//             alt="Натальная карта" 
//           />
//         ) : (
//           <img src="/NatalChart4.svg" alt="Натальная карта" />
//         )}
//       </div>

//       {isPopupOpen && chartData && (
//         <div className={styles.popupOverlay} onClick={() => setIsPopupOpen(false)}>
//           <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
//             <button 
//               className={styles.closeButton}
//               onClick={() => setIsPopupOpen(false)}
//             >
//               ×
//             </button>
            
//             <div className={styles.gridContainer}>
//               <div className={styles.gridItem}>
//                 <h3>Твой характер</h3>
//                 <div className={styles.svgPlaceholder}></div>
//               </div>
              
//               <div className={styles.gridItem}>
//                 <h3>Твоя стихия</h3>
//                 <div className={styles.svgPlaceholder}></div>
//               </div>
              
//               <div className={styles.gridItem}>
//                 <h3>Сильные и слабые стороны</h3>
//                 <div className={styles.svgPlaceholder}></div>
//               </div>
              
//               <div className={styles.gridItem}>
//                 <h3>Финансы</h3>
//                 <div className={styles.svgPlaceholder}></div>
//               </div>
              
//               <div className={styles.gridItem}>
//                 <h3>Отношения</h3>
//                 <div className={styles.svgPlaceholder}></div>
//               </div>
              
//               <div className={styles.gridItem}>
//                 <h3>Карьера</h3>
//                 <div className={styles.svgPlaceholder}></div>
//               </div>
//             </div>
            
//             <div className={styles.chartPreview}>
//               <img 
//                 src={`${chartData.chart_image}`} 
//                 alt="Натальная карта" 
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NatalChartPage;

import { useState, useEffect, useRef } from 'react';
import styles from "./styles.module.css";
import { generateChart } from '../../api/GetChart';
import type { ChartResponse } from '../../api/GetChart';

type InterpretationType = 
  | 'Твой характер' 
  | 'Твоя стихия' 
  | 'Сильные и слабые стороны' 
  | 'Финансы' 
  | 'Отношения' 
  | 'Карьера'
  | 'Выберите тип расшифровки';

const NatalChartPage = () => {
  const [chartData, setChartData] = useState<ChartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedInterpretation, setSelectedInterpretation] = 
    useState<InterpretationType>('Выберите тип расшифровки');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInterpretationOpen, setIsInterpretationOpen] = useState(false);
  const [currentInterpretation, setCurrentInterpretation] = 
    useState<InterpretationType>('Выберите тип расшифровки');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedChart = localStorage.getItem('natalChart');
    if (savedChart) {
      setChartData(JSON.parse(savedChart));
    } else {
      loadChartData();
    }
  }, []);

  // Обработка кликов вне dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && 
          dropdownRef.current && 
          buttonRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          !buttonRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Автоматическая прокрутка при открытии попапа
  useEffect(() => {
  if (isInterpretationOpen) {
    // Просто скроллим на фиксированную позицию (например, 100px от верха)
    window.scrollTo({
      top: 50,
      behavior: 'smooth'
    });
  }
}, [isInterpretationOpen]);

  const loadChartData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = {
        telegram_id: 665444333,
        name: "Роман",
        date_year: 2004,
        date_month: 2,
        date_day: 10,
        date_hour: 9,
        date_min: 35,
        location_lat: 55.7558,
        location_lon: 83.6176,
        location_utc_offset: "+06:00"
      };
      
      const response = await generateChart(data);
      setChartData(response);
      localStorage.setItem('natalChart', JSON.stringify(response));
    } catch (err) {
      setError('Ошибка при загрузке карты');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleInterpretationSelect = (type: InterpretationType) => {
    if (type === 'Выберите тип расшифровки') return;
    
    setCurrentInterpretation(type);
    setSelectedInterpretation('Выберите тип расшифровки');
    setIsDropdownOpen(false);
    setIsInterpretationOpen(true);
  };

  const closeInterpretation = () => {
    setIsInterpretationOpen(false);
  };

const interpretationContent: Record<InterpretationType, string> = {
  'Выберите тип расшифровки': '',
  'Твой характер': 'Ваш характер определяется положением Солнца и Асцендента в вашей натальной карте. Солнце в Овне придает вам смелость и инициативность, в то время как Луна в Раке делает вас эмоционально чувствительным и заботливым.',
  'Твоя стихия': 'Ваша доминирующая стихия - Огонь, что проявляется в вашей энергичности и страстности. Однако присутствие Земли в важных точках карты добавляет практичности и стабильности.',
  'Сильные и слабые стороны': 'Сильные стороны: лидерские качества, креативность, адаптивность. Слабые стороны: импульсивность, нетерпеливость, склонность к доминированию.',
  'Финансы': '2-й дом в Тельце указывает на стабильный финансовый потенциал. Юпитер в 8-м доме может принести неожиданные финансовые возможности через партнерства или инвестиции.',
  'Отношения': 'Венера в Близнецах в 7-м доме говорит о потребности в интеллектуальной связи с партнером. Вы цените общение и разнообразие в отношениях.',
  'Карьера': `Дорогой Роман,

твоя натальная карта — это словно тщательно написанный сценарий, в котором особенно ярко просматривается тема личного поиска и самореализации через труд, служение людям и смелое воплощение собственных идей. Давай разберём подробно твой путь профессиональной реализации, учитывая твои природные дары, таланты и возможные вызовы.

🌟 Природные способности и таланты в работе

С Солнцем в Водолее (12 дом) ты рождён с даром видеть мир иначе. Это талант к нетривиальному мышлению, новаторству, изобретательству, социальной чувствительности. Ты умеешь ощущать тенденции и предвидеть будущее — даже если сам не всегда осознаёшь это. Меркурий и Нептун в 11 доме подчёркивают твои способности к коллективной работе, дружеским проектам, участию в сетевых, социально-значимых инициативах. Твоя мысль острая, но не шаблонная: ты ищешь решения там, где другие видят только тупики.

Марс в Тельце в 1 доме даёт тебе внутреннюю силу, терпение и физическую выносливость. Это знак, что ты способен воплощать свои идеи не только теоретически, но и практическим трудом. При этом Марс делает тебя упорным, настойчивым, склонным к стабильной и материальной реализации. Важно научиться соединять воздушную водолейскую интуицию с земной энергией Тельца — тогда рождаются по-настоящему работающие проекты.

🛤️ Подходящие сферы деятельности

В карте очень ярко выделен 6 дом (работа, служение), в Деве — знак анализа, медицины, управления процессами. Луна и Юпитер в Деве в 6 доме дают явный талант к систематизации, заботе, улучшению процессов. Ты можешь быть великолепным:

· аналитиком, исследователем, инженером

· врачом или специалистом в сфере здравоохранения

· экологом, агрономом, биотехнологом

· менеджером проектов, организатором

· IT-специалистом, особенно в командных и инновационных разработках

· педагогом, ментором, человеком, который помогает другим расти

При этом 12 дом с сильным Солнцем и Венерой намекает на возможность более «закулисной», тихой работы: исследовательская лаборатория, архив, монастырь, больница, НКО. Здесь ты способен творить добро и перемены без излишней показной славы.

🌱 Потенциал для роста

Твой гороскоп буквально зовёт к постоянному обучению. Девийский 6 дом требует не стоять на месте — изучать новые методы, оттачивать мастерство. Северный узел в Тельце в 1 доме подчёркивает путь к самостоятельности: важно научиться опираться на себя, ценить свои ресурсы и не бояться заявить миру о том, что ты умеешь.

Это рост от коллективных идей к личной реализации. От абстрактного «надо помогать всем» к очень конкретному «вот как я это сделаю своими руками».

⚡ Возможные сложности и советы

Твоя карта не лишена вызовов.

Солнце и Венера в 12 доме могут давать периодическую потерю уверенности, уход от ответственности, желание спрятаться. Совет: не бойся брать на себя лидерство, даже если страшно.

Марс в Тельце — упрямство и консерватизм. Это даёт стабильность, но может мешать меняться. Учись слышать новое, не застревать в старом.

Луна в 6 доме в Весах склонна подстраиваться, жертвовать своим мнением ради мира. Но для профессионального роста важно уметь говорить «нет», расставлять приоритеты.

Юпитер в 6 доме в Деве даёт высокие требования к себе. Это прекрасно для качества работы, но может привести к выгоранию. Помни о балансе.

🌄 Как реализовать себя максимально полно

Твоя карта советует найти баланс между коллективным и личным. Работай в команде, но не теряй своё «я». Участвуй в социальных проектах, но не позволяй другим пользоваться твоей добротой без меры.

Старайся сочетать идеализм Водолея с практицизмом Тельца. Это твоя золотая формула.

Преврати любовь к людям в умение помогать конкретно, без лишней жертвы.

Развивай технические и аналитические навыки. IT, инженерия, медицина, экология — сферы, где ты сможешь соединить ум, сердце и руки.

Не избегай лидерства. Твой северный узел в 1 доме зовёт к тому, чтобы стать заметным, уверенным, независимым.

В итоге твой путь — это путь мастера, который умеет служить миру через качественный труд и вдохновляющие идеи. Твоё предназначение — улучшать жизни людей, организовывать процессы, строить новое на прочном фундаменте и при этом не бояться быть собой.

С любовью и поддержкой,
Твой личный таролог❤️`
};

  return (
    <div className={styles.natalPage}>
      <h1 className={styles.title}>Твоя натальная карта</h1>
      
      <div className={styles.description}>
        Натальная карта - это астрологический паспорт человека, 
        показывающий расположение планет в момент рождения. 
        Она раскрывает потенциал личности, сильные и слабые стороны.
      </div>

      <div className={styles.interpretationBlock}>
        <div 
          ref={buttonRef}
          className={styles.interpretationButton}
          onClick={toggleDropdown}
        >
          {selectedInterpretation}
          <span className={styles.arrow}>{isDropdownOpen ? '▲' : '▼'}</span>
        </div>
        
        <div 
          ref={dropdownRef}
          className={`${styles.interpretationMenu} ${isDropdownOpen ? styles.open : ''}`}
        >
          {([
            'Твой характер',
            'Твоя стихия',
            'Сильные и слабые стороны',
            'Финансы',
            'Отношения',
            'Карьера'
          ] as InterpretationType[]).map((item) => (
            <div
              key={item}
              className={styles.interpretationMenuItem}
              onClick={() => handleInterpretationSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.natalChart}>
        {isLoading ? (
          <div className={styles.loader}>Загрузка карты...</div>
        ) : chartData ? (
          <img 
            src={chartData.chart_image} 
            alt="Натальная карта" 
            className={styles.chartImage}
          />
        ) : (
          <div className={styles.placeholder}>
            Натальная карта не загружена
          </div>
        )}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {isInterpretationOpen && (
        <div 
          className={styles.popupOverlay} 
          onClick={closeInterpretation}
          ref={popupRef}
        >
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.popupTitle}>{currentInterpretation}</h3>
            <p className={styles.popupText}>
              {interpretationContent[currentInterpretation]}
            </p>
            <div className={styles.popupButtons}>
              <button 
                className={styles.popupCancel}
                onClick={closeInterpretation}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NatalChartPage;