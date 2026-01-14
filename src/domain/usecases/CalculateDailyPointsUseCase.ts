export class CalculateDailyPointsUseCase {
  /**
   * Calculate daily points based on seasonal formula:
   * - Day 1 of season: 2 points
   * - Day 2 of season: 3 points
   * - Day 3+: (100% previous day) + (60% day before previous) = total
   * - Round final value
   */
  execute(currentDate: Date = new Date()): number {
    const seasonStartDate = this.getSeasonStartDate(currentDate);
    const dayOfSeason = this.getDayOfSeason(currentDate, seasonStartDate);

    if (dayOfSeason === 1) return 2;
    if (dayOfSeason === 2) return 3;

    // Calculate using the formula for day 3+
    let previousDayPoints = 3;
    let dayBeforePreviousPoints = 2;

    for (let day = 3; day <= dayOfSeason; day++) {
      const currentPoints = previousDayPoints * 0.6 + dayBeforePreviousPoints;
      dayBeforePreviousPoints = previousDayPoints;
      previousDayPoints = currentPoints;
    }

    return Math.round(previousDayPoints);
  }

  private getSeasonStartDate(currentDate: Date): Date {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Determine season start date
    // Spring: March 1, Summer: June 1, Fall: September 1, Winter: December 1
    let seasonMonth: number;
    if (month >= 2 && month < 5) {
      seasonMonth = 2; // March (Spring)
    } else if (month >= 5 && month < 8) {
      seasonMonth = 5; // June (Summer)
    } else if (month >= 8 && month < 11) {
      seasonMonth = 8; // September (Fall)
    } else {
      // December, January, February (Winter)
      if (month === 11) {
        seasonMonth = 11; // December
      } else {
        // January or February - winter started last December
        return new Date(year - 1, 11, 1);
      }
    }

    return new Date(year, seasonMonth, 1);
  }

  private getDayOfSeason(currentDate: Date, seasonStartDate: Date): number {
    const diffTime = currentDate.getTime() - seasonStartDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Day 1 is the first day
  }

  formatPoints(points: number): string {
    if (points >= 1000) {
      return `${Math.round(points / 1000)}K`;
    }
    return points.toString();
  }
}
