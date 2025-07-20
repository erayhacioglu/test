import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocationReport } from "../../../redux/slices/AnalizeSlice";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

export default function LocationReportChart({ cardId, type = "DOWNLOAD", start, end }) {
  const dispatch = useDispatch();
  const { locationReport, locationLoading, locationError } = useSelector(state => state.analize);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);

  useEffect(() => {
    if (cardId) {
      dispatch(fetchLocationReport({ cardId, type, start, end }));
      setSelectedCountry(null);
      setSelectedProvince(null);
    }
  }, [cardId, type, start, end, dispatch]);

  if (locationLoading) return <div>Yükleniyor...</div>;
  if (locationError) return <div style={{ color: "red" }}>{locationError}</div>;
  if (!locationReport) return null;

  const countryData = locationReport.countries.map(c => ({
    name: c.country,
    count: c.provinces.reduce((sum, p) => sum + p.count, 0),
  }));

  const provinceData = selectedCountry
    ? selectedCountry.provinces.map(p => ({
        name: p.province,
        count: p.count,
      }))
    : [];

  const districtData = selectedProvince
    ? selectedProvince.districts.map(d => ({
        name: d.district,
        count: d.count,
      }))
    : [];

  return (
    <div>
      {/* Ülke grafıgı */}
      <h2>Ülke Bazlı Ziyaretçi Sayısı</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={countryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill="#8884d8"
            cursor="pointer"
            onClick={(data) => {
              const countryObj = locationReport.countries.find(c => c.country === data.name);
              setSelectedCountry(countryObj);
              setSelectedProvince(null); // İl seçimini sıfırla
            }}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* İl tarafı */}
      {selectedCountry && (
        <>
          <h3>{selectedCountry.country} İllerinin Ziyaretçi Sayısı</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={provinceData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#82ca9d"
                cursor="pointer"
                onClick={(data) => {
                  const provinceObj = selectedCountry.provinces.find(p => p.province === data.name);
                  setSelectedProvince(provinceObj);
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}

      {/* İlçe tarafı */}
      {selectedProvince && (
        <>
          <h4>{selectedProvince.province} İlçelerinin Ziyaretçi Sayısı</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={districtData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
