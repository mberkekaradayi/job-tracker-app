import React from "react";
import { Button } from "@/components/ui/button";
import { FiPlus, FiBriefcase } from "react-icons/fi";

interface NavbarProps {
  onAddNew: () => void;
}

export function Navbar({ onAddNew }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white py-5 px-6 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div
          className="flex items-center space-x-3 navbar-item"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="navbar-logo">
            <FiBriefcase className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Job Tracker</h1>
        </div>

        <div
          className="flex items-center space-x-4 navbar-item"
          style={{ animationDelay: "0.2s" }}
        >
          <Button onClick={onAddNew} className="navbar-button" size="default">
            <FiPlus className="mr-2 h-4 w-4" />
            Add Application
          </Button>
        </div>
      </div>
    </nav>
  );
}
