import React, { useState } from 'react';
import axios from 'axios';
const Weather: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const getWeather = async () => {
    if (!city) {
      setError('Vui lòng nhập tên thành phố!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`https://wttr.in/${city}?format=j1`);
      const current = res.data.current_condition[0];
      setWeather({
        tempC: current.temp_C,
        desc: current.weatherDesc[0].value,
      });
    } catch {
      setError('Không thể lấy dữ liệu. Kiểm tra lại tên thành phố!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '2rem',
        marginTop: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <h1>🌤️ Ứng dụng thời tiết</h1>

      <input
        type="text"
        placeholder="Nhập tên thành phố..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          padding: '8px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          marginRight: '8px',
        }}
      />
      <button
        onClick={getWeather}
        style={{
          padding: '8px 16px',
          borderRadius: '6px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Xem thời tiết
      </button>
      {loading && <p>⏳ Đang tải dữ liệu...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div style={{ marginTop: '1rem' }}>
          <h2>Thời tiết tại: {city}</h2>
          <p>Nhiệt độ: {weather.tempC}°C</p>
          <p>Tình trạng: {weather.desc}</p>
        </div>
      )}
    </div>
  );
};
export default Weather;
