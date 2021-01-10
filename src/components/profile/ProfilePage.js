import React from "react";
import ProfileView from './ProfileViewProps'
import { Menu } from '../menu'

export function ProfilePage() {
  return (
    <main className="main">
      <Menu />
      <ProfileView />
    </main>
  );
}