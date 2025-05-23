import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from './Card';
import { StatusBadge } from './StatusBadge';
import { Route } from '../models/delivery';
import { colors, typography, spacing } from '../constants/theme';
import { MapPin, Package } from 'lucide-react-native';

interface RouteCardProps {
  route: Route;
  onPress: () => void;
}

export function RouteCard({ route, onPress }: RouteCardProps) {
  // Format the date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  const totalStops = route.stops.length;
  const completedStops = route.stops.filter(stop => stop.isCompleted).length;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.routeName}>{route.name}</Text>
          <StatusBadge status={route.status} />
        </View>

        <View style={styles.info}>
          <View style={styles.infoItem}>
            <MapPin size={16} color={colors.primary.main} />
            <Text style={styles.infoText}>
              {totalStops} {totalStops === 1 ? 'stop' : 'stops'}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Package size={16} color={colors.primary.main} />
            <Text style={styles.infoText}>
              {completedStops}/{totalStops} completed
            </Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(completedStops / totalStops) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <Text style={styles.date}>{formatDate(route.date)}</Text>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  routeName: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
  },
  info: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  infoText: {
    marginLeft: spacing.xs,
    color: colors.text.secondary,
    fontSize: typography.fontSizes.md,
  },
  progressContainer: {
    marginBottom: spacing.sm,
  },
  progressBackground: {
    height: 6,
    backgroundColor: colors.background.default,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.success.main,
  },
  date: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
});