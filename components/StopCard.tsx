import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card } from './Card';
import { Stop } from '../models/delivery';
import { colors, typography, spacing } from '../constants/theme';
import { Check, Navigation, Clock } from 'lucide-react-native';

interface StopCardProps {
  stop: Stop;
  onPress: () => void;
  isActive?: boolean;
}

export function StopCard({ stop, onPress, isActive = false }: StopCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card 
        style={[
          styles.container,
          isActive && styles.activeContainer
        ]}
        elevation={isActive ? 'high' : 'medium'}
      >
        <View style={styles.header}>
          <View style={styles.stopNumberContainer}>
            <Text style={styles.stopNumber}>{stop.number}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Clock size={16} color={colors.secondary.main} />
            <Text style={styles.time}>{stop.scheduledTime}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.customerName}>{stop.customer.name}</Text>
          <Text style={styles.address}>
            {stop.customer.address}, {stop.customer.city}
          </Text>
          
          <View style={styles.itemsContainer}>
            <Text style={styles.itemsTitle}>
              {stop.items.length} {stop.items.length === 1 ? 'item' : 'items'}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          {stop.isCompleted ? (
            <View style={styles.completedBadge}>
              <Check size={14} color={colors.success.main} />
              <Text style={styles.completedText}>Delivered</Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.navigationButton}
              onPress={(e) => {
                e.stopPropagation();
                // In a real app, this would open maps with directions
                alert(`Navigate to ${stop.customer.address}`);
              }}
            >
              <Navigation size={14} color={colors.primary.main} />
              <Text style={styles.navigationText}>Navigate</Text>
            </TouchableOpacity>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    marginVertical: spacing.sm,
  },
  activeContainer: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.main,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  stopNumberContainer: {
    backgroundColor: colors.primary.main,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopNumber: {
    color: colors.white,
    fontWeight: typography.fontWeights.bold,
    fontSize: typography.fontSizes.sm,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    marginLeft: spacing.xs,
    fontSize: typography.fontSizes.sm,
    color: colors.secondary.main,
    fontWeight: typography.fontWeights.medium,
  },
  content: {
    marginBottom: spacing.md,
  },
  customerName: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  address: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  itemsContainer: {
    marginTop: spacing.xs,
  },
  itemsTitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    fontWeight: typography.fontWeights.medium,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success.light,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: spacing.sm,
  },
  completedText: {
    marginLeft: spacing.xs,
    color: colors.success.dark,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
  },
  navigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.default,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: spacing.sm,
  },
  navigationText: {
    marginLeft: spacing.xs,
    color: colors.primary.main,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
  },
});