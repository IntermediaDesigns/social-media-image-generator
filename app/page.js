"use client";
import { Component } from 'react';
import Navbar from '../components/Navbar';
import './globals.css';

export default function Home({ pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
