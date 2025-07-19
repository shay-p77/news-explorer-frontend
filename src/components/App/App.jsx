import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import NoResults from "../NoResults/NoResults";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import "../App/App.css";
import { getNews } from "../../utils/newsApi";
import SavedArticles from "../SavedArticles/SavedArticles";
import RegisterSuccessModal from "../RegisterSuccessModal/RegisterSuccessModal";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState(""); // store current search keyword
  const [searchResults, setSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRegisterSuccessOpen, setIsRegisterSuccessOpen] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [savedArticles, setSavedArticles] = useState(() => {
    const saved = localStorage.getItem("savedArticles");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
  }, [savedArticles]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    if (token && currentUserEmail) {
      const users = getStoredUsers();
      const user = users.find((u) => u.email === currentUserEmail);
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
      }
    }
  }, []);

  async function handleSearch(keyword) {
    setSearchKeyword(keyword); // save keyword here
    setIsLoading(true);
    setError(null);
    try {
      const cards = await getNews(keyword);
      setSearchResults(cards);
      setIsSearched(true);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
      setIsSearched(false);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSignInClick() {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  }

  function openRegisterModal() {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  }

  function openLoginModal() {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  }

  function closeLoginModal() {
    setIsLoginOpen(false);
  }

  function closeRegisterModal() {
    setIsRegisterOpen(false);
  }

  function handleLoginSuccess(userData) {
    const users = getStoredUsers();
    const user = users.find(
      (u) => u.email === userData.email && u.password === userData.password
    );
    if (user) {
      localStorage.setItem("token", "demo-token");
      localStorage.setItem("currentUserEmail", user.email);
      setCurrentUser(user);
      setIsLoggedIn(true);
      closeLoginModal();
    } else {
      alert("Invalid email or password");
    }
  }

  function getStoredUsers() {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  }

  function saveUser(user) {
    const users = getStoredUsers();
    const userExists = users.some((u) => u.email === user.email);
    if (!userExists) {
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

  function handleRegisterSuccess(userData) {
    const user = {
      name: userData.username,
      email: userData.email,
      password: userData.password,
    };
    saveUser(user);
    closeRegisterModal();
    setIsRegisterSuccessOpen(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSavedArticles([]);
    navigate("/");
  }

  function closeRegisterSuccessModal() {
    setIsRegisterSuccessOpen(false);
  }

  function handleOpenLoginFromSuccess() {
    setIsRegisterSuccessOpen(false);
    openLoginModal();
  }

  // save article along with current search keyword
  function handleSaveArticle(article) {
    const articleWithKeyword = { ...article, keyword: searchKeyword };
    if (!savedArticles.some((a) => a.link === article.link)) {
      setSavedArticles((prev) => [...prev, articleWithKeyword]);
    }
  }

  function handleRemoveArticle(articleToRemove) {
    setSavedArticles((prev) =>
      prev.filter((article) => article.link !== articleToRemove.link)
    );
  }

  return (
    <>
      <div className="hero-wrapper">
        <Header
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onSignInClick={handleSignInClick}
          onLogout={handleLogout}
        />
        {location.pathname === "/" && <SearchForm onSearch={handleSearch} />}
      </div>

      {isLoading && <Preloader />}
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>
      )}

      {location.pathname === "/" && (
        <>
          {!isLoading && isSearched && searchResults.length > 0 && (
            <div className="results__background">
              <NewsCardList
                cards={searchResults}
                isLoggedIn={isLoggedIn}
                savedArticles={savedArticles}
                onSave={handleSaveArticle}
                onUnsave={handleRemoveArticle}
              />
            </div>
          )}

          {!isLoading && isSearched && searchResults.length === 0 && !error && (
            <NoResults />
          )}
        </>
      )}

      {isLoginOpen && (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={closeLoginModal}
          onLogin={handleLoginSuccess}
          onOpenRegister={openRegisterModal}
        />
      )}

      {isRegisterOpen && (
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={closeRegisterModal}
          onRegister={handleRegisterSuccess}
          onOpenLogin={openLoginModal}
        />
      )}

      {isRegisterSuccessOpen && (
        <RegisterSuccessModal
          isOpen={isRegisterSuccessOpen}
          onClose={closeRegisterSuccessModal}
          onOpenLogin={handleOpenLoginFromSuccess}
        />
      )}

      <Routes>
        <Route path="/" element={<Main />} />

        <Route
          path="/saved-articles"
          element={
            isLoggedIn ? (
              <SavedArticles
                savedArticles={savedArticles}
                onRemove={handleRemoveArticle}
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
              />
            ) : (
              <Main />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
