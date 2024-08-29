'use client';

import React from 'react';
import { useQuery } from 'react-query';
import { PieChart, Pie, Tooltip, Cell, Label } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getDashboard } from '@/api/dashboard';
import '@/components/DashboardPage/DashboardPage.css';

export default function DashboardPage() {
  const { data: dashboardData, isLoading, error } = useQuery('dashboardData', getDashboard);
  const COLORS = [
    '#0088FE', // Bleu
    '#00C49F', // Vert
    '#FFBB28', // Jaune
    '#FF8042', // Orange
    '#8884D8', // Violet
    '#FF6F61', // Rouge corail
    '#6A5ACD', // Bleu ardoise
    '#FFD700', // Or
    '#40E0D0', // Turquoise
    '#9ACD32', // Vert lime
    '#FF1493'  // Rose profond
  ];
  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <Card className="dashboard-card">
          <CardHeader className="dashboard-card-header">
            <CardTitle className="dashboard-card-title">إحصائيات المستخدمين</CardTitle>
            <CardDescription className="dashboard-card-description">إحصائيات المستخدمين حسب المنطقة</CardDescription>
          </CardHeader>
          <CardContent className="dashboard-card-content">
            <div>Loading...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !dashboardData) {
    console.error("No data available for usersByProvince.");
    return (
      <div className="dashboard-error">
        <Card className="dashboard-card">
          <CardHeader className="dashboard-card-header">
            <CardTitle className="dashboard-card-title">إحصائيات المستخدمين</CardTitle>
            <CardDescription className="dashboard-card-description">إحصائيات المستخدمين حسب المنطقة</CardDescription>
          </CardHeader>
          <CardContent className="dashboard-card-content">
            <div>Error loading data</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Transformer les données pour le graphique
  const regionData = [
    { name: 'Province 1', users: dashboardData.nbrUsersProvince1 },
    { name: 'Province 2', users: dashboardData.nbrUsersProvince2 },
    { name: 'Region 1', users: dashboardData.nbrUsersRegion1 },
    { name: 'Region 2', users: dashboardData.nbrUsersRegion2 },
  ];

  const totalUsers = dashboardData?.totalUsers || 0;

  return (
    <Card className="dashboard-card">
      <CardHeader className="dashboard-card-header">
  <CardTitle className="dashboard-card-title">
    إحصائيات المستخدمين
  </CardTitle>

  <CardDescription className="dashboard-card-description">
    إحصائيات المستخدمين حسب المنطقة
  </CardDescription>
</CardHeader>
      <CardContent className="dashboard-card-content">
        <PieChart width={400} height={400}>
          <Tooltip />
          <Pie
            data={regionData}
            dataKey="users"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
            stroke="none"
          >
            {regionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalUsers.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        المستخدمين
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </CardContent>
      <CardFooter className="dashboard-card-footer">
        <div className="leading-none text-muted-foreground">
          عرض المستخدمين حسب المنطقة
        </div>
      </CardFooter>
    </Card>
  );
}
