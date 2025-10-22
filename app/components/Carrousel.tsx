"use client";

'use client';

import Image from 'next/image';
import styles from './Carrousel.module.css';
import { useState } from 'react';

const images = Array.from({ length: 13 }, (_, i) => `/photo${i + 1}.jpg`);