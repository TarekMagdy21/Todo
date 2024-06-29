import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  //   onClick={() => i18n.changeLanguage(lng)}
  console.log(i18n);
  return (
    <button
    className="text-white text-3xl cursor-pointer hover:text-cyan-500 font-semibold"
      onClick={() => {
        if (i18n.language === "en") {
          i18n.changeLanguage("ar");
        } else {
          i18n.changeLanguage("en");
        }
      }}
    >
      {i18n.language == "en" ? "Arabic" : "English"}
    </button>
  );
};

export default LanguageSwitcher;
