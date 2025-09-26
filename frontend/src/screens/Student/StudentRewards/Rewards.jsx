import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';

// Import your SVG components here
import TrophyIcon from '../../../assets/Student/Trophy';
import StarIcon from '../../../assets/Student/StarIcon';
import MedalIcon from '../../../assets/Student/MedalIcon';
import BookIcon from '../../../assets/Student/BookIcon';
import SettingsIcon from '../../../assets/Student/SettingsIcon';
import ChatIcon from '../../../assets/Student/ChatIcon';

const { width } = Dimensions.get('window');

const Rewards = () => {
  const [activeTab, setActiveTab] = useState('progress');
  const [selectedTimeframe, setSelectedTimeframe] = useState('weekly');
  const [expandedStudent, setExpandedStudent] = useState(null);

  // Achievement data
  const achievements = [
    { id: 1, level: 'Level 3', points: '100Rp', type: 'star' },
    { id: 2, level: 'Level 1', points: '300Rp', type: 'trophy' },
    { id: 3, level: 'Level 2', points: '200Rp', type: 'medal' },
  ];

  // Category data
  const categories = [
    { id: 1, name: 'Academic', color: '#D2691E' },
    { id: 2, name: 'Sports', color: '#CD853F' },
    { id: 3, name: 'Others', color: '#DEB887' },
  ];

  // Achievement stats
  const stats = [
    {
      id: 1,
      title: 'Top rank scorer',
      points: '+ 45 Rp',
      percentage: 81,
      icon: 'trophy',
      color: '#4FC3F7',
    },
    {
      id: 2,
      title: 'Material chaser',
      points: '+ 45 Rp',
      percentage: 84,
      icon: 'book',
      color: '#42A5F5',
    },
  ];

  // Leaderboard data
  const leaderboardData = {
    weekly: [
      { id: 1, name: 'Alex Johnson', points: 1250, rank: 1, avatar: '👨‍🎓', streak: 7, badges: ['🏆', '⭐'] },
      { id: 2, name: 'Sarah Chen', points: 1180, rank: 2, avatar: '👩‍🎓', streak: 5, badges: ['🥇', '📚'] },
      { id: 3, name: 'Mike Davis', points: 1120, rank: 3, avatar: '👨‍💻', streak: 4, badges: ['🥉'] },
      { id: 4, name: 'Emma Wilson', points: 1050, rank: 4, avatar: '👩‍🔬', streak: 3, badges: ['⭐'] },
      { id: 5, name: 'You', points: 980, rank: 5, avatar: '👤', streak: 2, badges: ['📖'], isCurrentUser: true },
      { id: 6, name: 'John Smith', points: 920, rank: 6, avatar: '👨‍🎨', streak: 1, badges: [] },
      { id: 7, name: 'Lisa Brown', points: 880, rank: 7, avatar: '👩‍💼', streak: 0, badges: [] },
    ],
    monthly: [
      { id: 1, name: 'Sarah Chen', points: 4850, rank: 1, avatar: '👩‍🎓', streak: 28, badges: ['🏆', '⭐', '📚'] },
      { id: 2, name: 'Alex Johnson', points: 4720, rank: 2, avatar: '👨‍🎓', streak: 25, badges: ['🥈', '⭐'] },
      { id: 3, name: 'You', points: 4200, rank: 3, avatar: '👤', streak: 20, badges: ['🥉', '📖'], isCurrentUser: true },
      { id: 4, name: 'Mike Davis', points: 3950, rank: 4, avatar: '👨‍💻', streak: 18, badges: ['⭐'] },
      { id: 5, name: 'Emma Wilson', points: 3800, rank: 5, avatar: '👩‍🔬', streak: 15, badges: [] },
    ],
    allTime: [
      { id: 1, name: 'Alex Johnson', points: 15420, rank: 1, avatar: '👨‍🎓', streak: 45, badges: ['👑', '🏆', '⭐', '📚'] },
      { id: 2, name: 'Sarah Chen', points: 14200, rank: 2, avatar: '👩‍🎓', streak: 42, badges: ['🏆', '⭐', '📚'] },
      { id: 3, name: 'Mike Davis', points: 12800, rank: 3, avatar: '👨‍💻', streak: 38, badges: ['🥉', '⭐'] },
      { id: 4, name: 'You', points: 11500, rank: 4, avatar: '👤', streak: 35, badges: ['📖', '⭐'], isCurrentUser: true },
      { id: 5, name: 'Emma Wilson', points: 10200, rank: 5, avatar: '👩‍🔬', streak: 30, badges: ['⭐'] },
    ]
  };

  const renderAchievementIcon = (type, isCenter = false) => {
    const iconProps = {
      width: isCenter ? 60 : 40,
      height: isCenter ? 60 : 40,
    };

    switch (type) {
      case 'star':
        return (
          <View style={[styles.iconPlaceholder, isCenter && styles.centerIconPlaceholder]}>
            <StarIcon {...iconProps} />
          </View>
        );
      case 'trophy':
        return (
          <View style={[styles.iconPlaceholder, isCenter && styles.centerIconPlaceholder]}>
            <TrophyIcon {...iconProps} />
          </View>
        );
      case 'medal':
        return (
          <View style={[styles.iconPlaceholder, isCenter && styles.centerIconPlaceholder]}>
            <StarIcon {...iconProps} />
          </View>
        );
      default:
        return null;
    }
  };

  const renderStatIcon = (type, color) => {
    const iconProps = {
      width: 24,
      height: 24,
    };

    switch (type) {
      case 'trophy':
        return (
          <View style={[styles.statIconContainer, { backgroundColor: color }]}>
            <TrophyIcon {...iconProps} color="#fff" />
          </View>
        );
      case 'book':
        return (
          <View style={[styles.statIconContainer, { backgroundColor: color }]}>
            <BookIcon {...iconProps} color="#fff" />
          </View>
        );
      default:
        return null;
    }
  };

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return '#E0E0E0'; // Gray
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🏆';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const handleStudentPress = (studentId) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  const renderLeaderboard = () => {
    const currentData = leaderboardData[selectedTimeframe];
    
    return (
      <View style={styles.leaderboardContainer}>
        <View style={styles.leaderboardHeader}>
          <Text style={styles.leaderboardTitle}>Leaderboard</Text>
          <View style={styles.timeframeSelector}>
            {['weekly', 'monthly', 'allTime'].map((timeframe) => (
              <TouchableOpacity
                key={timeframe}
                style={[
                  styles.timeframeButton,
                  selectedTimeframe === timeframe && styles.activeTimeframe,
                ]}
                onPress={() => setSelectedTimeframe(timeframe)}
              >
                <Text
                  style={[
                    styles.timeframeText,
                    selectedTimeframe === timeframe && styles.activeTimeframeText,
                  ]}
                >
                  {timeframe === 'allTime' ? 'All Time' : timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.leaderboardList}>
          {currentData.map((student, index) => (
            <TouchableOpacity
              key={student.id}
              style={[
                styles.leaderboardItem,
                student.isCurrentUser && styles.currentUserItem,
                expandedStudent === student.id && styles.expandedItem,
              ]}
              onPress={() => handleStudentPress(student.id)}
              activeOpacity={0.7}
            >
              <View style={styles.studentMainInfo}>
                <View style={styles.rankSection}>
                  <View style={[styles.rankBadge, { backgroundColor: getRankBadgeColor(student.rank) }]}>
                    <Text style={styles.rankText}>
                      {student.rank <= 3 ? getRankIcon(student.rank) : student.rank}
                    </Text>
                  </View>
                </View>

                <View style={styles.avatarSection}>
                  <Text style={styles.avatar}>{student.avatar}</Text>
                  {student.streak > 0 && (
                    <View style={styles.streakBadge}>
                      <Text style={styles.streakText}>🔥{student.streak}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.studentInfo}>
                  <Text style={[
                    styles.studentName,
                    student.isCurrentUser && styles.currentUserName
                  ]}>
                    {student.name}
                  </Text>
                  <Text style={styles.studentPoints}>{student.points} Rp</Text>
                </View>

                <View style={styles.badgesSection}>
                  {student.badges.slice(0, 2).map((badge, badgeIndex) => (
                    <Text key={badgeIndex} style={styles.badge}>{badge}</Text>
                  ))}
                  {student.badges.length > 2 && (
                    <Text style={styles.moreBadges}>+{student.badges.length - 2}</Text>
                  )}
                </View>
              </View>

              {expandedStudent === student.id && (
                <View style={styles.expandedInfo}>
                  <View style={styles.expandedStats}>
                    <View style={styles.statBox}>
                      <Text style={styles.statValue}>{student.streak}</Text>
                      <Text style={styles.statLabel}>Day Streak</Text>
                    </View>
                    <View style={styles.statBox}>
                      <Text style={styles.statValue}>{student.badges.length}</Text>
                      <Text style={styles.statLabel}>Badges</Text>
                    </View>
                    <View style={styles.statBox}>
                      <Text style={styles.statValue}>#{student.rank}</Text>
                      <Text style={styles.statLabel}>Rank</Text>
                    </View>
                  </View>
                  <View style={styles.allBadges}>
                    <Text style={styles.allBadgesTitle}>All Badges:</Text>
                    <View style={styles.badgesList}>
                      {student.badges.map((badge, badgeIndex) => (
                        <Text key={badgeIndex} style={styles.expandedBadge}>{badge}</Text>
                      ))}
                      {student.badges.length === 0 && (
                        <Text style={styles.noBadges}>No badges yet</Text>
                      )}
                    </View>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderProgressTab = () => (
    <View style={styles.tabContent}>
      {/* Achievement Icons Section */}
      <View style={styles.achievementsContainer}>
        {achievements.map((achievement, index) => (
          <View key={achievement.id} style={styles.achievementItem}>
            {renderAchievementIcon(achievement.type, index === 1)}
            <Text style={styles.achievementLevel}>{achievement.level}</Text>
            <Text style={styles.achievementPoints}>{achievement.points}</Text>
          </View>
        ))}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '75%' }]} />
          <View style={styles.progressDot} />
        </View>
        <Text style={styles.progressText}>Score 128Rp to achieve level 1</Text>
      </View>

      {/* Category Buttons */}
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.categoryButton, { backgroundColor: category.color }]}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        {stats.map((stat) => (
          <View key={stat.id} style={styles.statItem}>
            <View style={styles.statLeft}>
              {renderStatIcon(stat.icon, stat.color)}
              <View style={styles.statTextContainer}>
                <Text style={styles.statTitle}>{stat.title}</Text>
                <Text style={styles.statPoints}>{stat.points}</Text>
              </View>
            </View>
            <View style={styles.statRight}>
              <View style={styles.percentageContainer}>
                <Text style={styles.percentageText}>{stat.percentage}%</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Leaderboard Section */}
      {renderLeaderboard()}
    </View>
  );

  const renderAchievementsTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.comingSoon}>Achievements coming soon...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rewards</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <SettingsIcon width={24} height={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <ChatIcon width={24} height={24} color="#666" /> 
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'progress' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('progress')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'progress' && styles.activeTabText,
            ]}
          >
            Your progress
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'achievements' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('achievements')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'achievements' && styles.activeTabText,
            ]}
          >
            Achievements
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {activeTab === 'progress' ? renderProgressTab() : renderAchievementsTab()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#E3F2FD',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  headerIcon: {
    padding: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  achievementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  achievementItem: {
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  centerIconPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFE0B2',
  },
  achievementLevel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  achievementPoints: {
    fontSize: 11,
    color: '#666',
  },
  progressContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 10,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  progressDot: {
    position: 'absolute',
    right: '25%',
    top: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2196F3',
  },
  progressText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  statLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statTextContainer: {
    flex: 1,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  statPoints: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  statRight: {
    alignItems: 'flex-end',
  },
  percentageContainer: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1976D2',
  },
  // Leaderboard Styles
  leaderboardContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leaderboardHeader: {
    marginBottom: 20,
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  timeframeSelector: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 2,
  },
  timeframeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 18,
  },
  activeTimeframe: {
    backgroundColor: '#2196F3',
  },
  timeframeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  activeTimeframeText: {
    color: '#fff',
  },
  leaderboardList: {
    gap: 10,
  },
  leaderboardItem: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  currentUserItem: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  expandedItem: {
    backgroundColor: '#F8F9FA',
  },
  studentMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankSection: {
    marginRight: 15,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  avatarSection: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    fontSize: 32,
  },
  streakBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  streakText: {
    fontSize: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  studentInfo: {
    flex: 1,
    marginRight: 10,
  },
  studentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  currentUserName: {
    color: '#1976D2',
  },
  studentPoints: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  badgesSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    fontSize: 16,
    marginLeft: 2,
  },
  moreBadges: {
    fontSize: 10,
    color: '#666',
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 4,
  },
  expandedInfo: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  expandedStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  allBadges: {
    alignItems: 'center',
  },
  allBadgesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  badgesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 5,
  },
  expandedBadge: {
    fontSize: 18,
  },
  noBadges: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  comingSoon: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
});

export default Rewards;