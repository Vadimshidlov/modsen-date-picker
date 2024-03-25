# Tестовое задание библиотека Modsen DatePicker

## About the library

Date picker library, that can help you to add calendar with date input in you project. You can change functionality of the calendar 
using various decorators with class DecoratorService or without it, only with HOC's.

## Installation

For the library to work correctly you need:

- install the styled-components package via npm or yarn:

```
npm install styled-components
```

```
yarn add styled-components
```

- install the package via npm or yarn:

```
npm install @vadimshidlov/modsen-date-picker
```

```
yarn add @vadimshidlov/modsen-date-picker
```

## Usage

```javascript
import ReactDOM from "react-dom/client";
import {
  DecoratorService,
  withHolidays,
  withMinMaxDate,
  withRange,
  withWeekMode,
  withWeekSunday,
  DatePicker,
} from "vadimshidlov-date-picker";

const root = ReactDOM.createRoot(document.getElementById("root"));

const calendarService = new DecoratorService();

const holidaysList = [{date: new Date(2024, 03, 8), title: "Women's day"}];
const minDate = new Date(2024, 03, 1);
const maxDate = new Date(2028, 03, 31);


calendarService.addDecorator(withHolidays(holidaysList));
calendarService.addDecorator(withMinMaxDate(minDate, maxDate));
calendarService.addDecorator(withWeekends);
calendarService.addDecorator(withRange);
calendarService.addDecorator(withWeekMode);


const DatePickerWithHocs = calendarService.getDatePicker();

const renderApp = () => {
  root.render(
    <>
      <DatePickerWithHocs />
    </>,
  );
};

renderApp();
```

You can use this package without HOC's:

```javascript
import ReactDOM from "react-dom/client";
import {
  DatePicker,
} from "vadimshidlov-date-picker";

const root = ReactDOM.createRoot(document.getElementById("root"));

const holidaysList = [{date: new Date(2024, 03, 8), title: "Women's day"}];
const minDate = new Date(2024, 03, 1);
const maxDate = new Date(2028, 03, 31);

const renderApp = () => {
  root.render(
    <>
      <DatePicker
              minDate={minDate}
              maxDate={maxDate}
              withHolidays
              holidaysList={holidaysList}
              withRange={false}
              weekStartsOnSunday={false}
              weekMode={false}
      />
    </>,
  );
};

renderApp();
```

## Содержание

- [Техническое задание](#Техническое-задание)
- [Используемые технологии](#Используемые-технологии)
- [Структура проекта](#Структура-проекта)
- [Тестирование](#Тестирование)
- [Как начать](#Как-начать)
- [Полезные ссылки](#Полезные-ссылки)

## Техническое задание

Необходимо реализовать библиотеку Javascript - **_DatePicker_**, для работы с различными видами календаря.
Цель состоит в том, чтобы создать базовую библиотеку, которую можно настраивать и расширять.

#### Необходимый функционал:

- Просмотр календаря;
- Выбор диапазона для календаря;
- Дефолтный календарь с заранее установленным диапазоном;
- Возможность выбора начала недели(с понедельника или воскресенья);
- Выбор вида календаря (по неделям, месяцам и т.д.);
- Реализовать возможность при клике на определенный день добавлять список задач и
  сохранять их в localStorage;
- Возможность переключения на предыдущий(ую)/следующий(ую) неделю/месяц/год;
- Возможность выбора максимальной даты календаря;
- Возможность выбора минимальной даты для календаря;
- Возможность скрывать/показывать выходные дни и выделять праздничные дни другим цветом;
- Возможность перейти в календаре на введенную пользователем дату;
- Стилизация календаря.

#### Дополнительный функционал:

- Развернуть приложение на хостинге (heroku, vercel);
- Настроить CI/CD, используя [GitHub Actions](https://github.com/features/actions);
- Собрать проект с нуля(с настройками всех конфигов: rollup, eslint, prettier, husky).

#### Пример графического представления:

Ссылка на макет: [Макет "DatePicker"](https://www.figma.com/file/PGg4P38QaPjUzasxC2GSkv/Modsen-Datepicker?node-id=0%3A1&t=dWZj8oM41qBje0bv-0).

#### Также проект предполагает:

- Придерживаться требований по написанию и организации кода react приложения. Ссылка на требования: [Требования к тестовому заданию](https://github.com/annaprystavka/requirements);

- Разделить библиотеку на два основных компонента: представления и логики. Для реализации логики приложения необходимо использовать порождающий паттерн программирования **_"Декоратор"_**, который позволяет динамически добавлять объектам новую функциональность, оборачивая их в полезные «обёртки» (см. подробнее [паттерн Декоратор](https://refactoring.guru/ru/design-patterns/decorator)). При помощи паттерна создать сервисный класс, в котором вы будете задавать конфигурацию и создавать календарь;

- Настроить конфигурации **_babel_**, **_eslint_**, **_prettier_**;

- Подключить и настроить бандлер **_Rollup_** для сборки проекта в библиотеку;

- Подключить и настроить **_Storybook_** для проверки работоспособности вашей библиотеки;

- Добавить обработку ошибок через паттерн **_Error Boundaries_**;

- Добавить проверку типов в React компонентах, передаваемых параметров и подобных объектов;

- Использовать алиасы для импортирования файлов;

- В приложении допускается использование языка typescript;

- Нельзя использовать какие-либо сторонние библиотеки.

## Используемые технологии

### Для react

- **_node.js_** - программная платформа, основанная на движке V8 (транслирующем JavaScript в машинный код);
- **_babel_** - транспайлер, преобразующий код из одного стандарта в другой;
- **_eslint_** - линтер для JavaScript кода;
- **_yarn_** - менеджер пакетов;
- **_rollup_** - сборщик ES-модулей;
- **_storybook_** - инструмент, используемый для разработки компонентов пользовательского интерфейса в изоляции;
- **_react_** - JavaScript-библиотека для создания пользовательских интерфейсов;
- **_prop-types_** - набор валидаторов, которые могут быть использованы для проверки получаемых данных;
- **_styled-components_** - система стилизации react компонентов;
- **_jest_** — интеграционное тестирование (rtl) + unit-тестирование.

### Для react native

Will be soon...

## Структура проекта

[Структура проекта](https://github.com/mkrivel/structure)

## Тестирование

Реализовать e2e тестирование c полным покрытием функционала приложения:

- Сервис для конфигурации DatePicker-компонента;
- Графическое (компонент модуля и т.д.).

## Полезные ссылки

[React](https://reactjs.org/docs/getting-started.html)

[Rollup](https://rollupjs.org/guide/en/)

[Storybook](https://storybook.js.org/docs/basics/introduction/)

[Eslint](https://eslint.org/docs/user-guide/configuring)

[Babel](https://babeljs.io/docs/en/configuration)

[Тестирование Jest](https://jestjs.io/ru/docs/getting-started)

[Styled-components](https://www.styled-components.com/docs)

[Husky](https://dev.to/ivadyhabimana/setup-eslint-prettier-and-husky-in-a-node-project-a-step-by-step-guide-946)
