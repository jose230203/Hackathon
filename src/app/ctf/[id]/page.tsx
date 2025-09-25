import React from 'react';
import CTFChallengeView from '@/presentation/views/CTF/CTFChallengeView';

export default function Page({ params }: { params: { id: string } }) {
  return <CTFChallengeView id={params.id} />;
}
