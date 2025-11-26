import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

export default function ResultScreen({ route, navigation }) {
  const { userName, userEmail, score, totalQuestions } = route.params;

  const percentage = Math.round((score / totalQuestions) * 100);

  const getPerformanceMessage = () => {
    if (percentage === 100) {
      return {
        emoji: '🏆',
        title: 'Perfeito!',
        message: 'Você acertou todas as questões! Excelente trabalho!',
        color: '#10b981'
      };
    } else if (percentage >= 70) {
      return {
        emoji: '🎉',
        title: 'Muito Bem!',
        message: 'Ótimo desempenho! Continue estudando!',
        color: '#6366f1'
      };
    } else if (percentage >= 50) {
      return {
        emoji: '👍',
        title: 'Bom!',
        message: 'Bom resultado! Ainda há espaço para melhorar!',
        color: '#f59e0b'
      };
    } else {
      return {
        emoji: '📚',
        title: 'Continue Tentando!',
        message: 'Não desanime! Estude mais e tente novamente!',
        color: '#ef4444'
      };
    }
  };

  const performance = getPerformanceMessage();

  const handleRestartQuiz = () => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.emoji}>{performance.emoji}</Text>
        <Text style={[styles.title, { color: performance.color }]}>
          {performance.title}
        </Text>
        <Text style={styles.message}>{performance.message}</Text>
      </View>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Sua Pontuação</Text>
        <View style={styles.scoreContainer}>
          <Text style={[styles.scorePercentage, { color: performance.color }]}>
            {percentage}%
          </Text>
          <Text style={styles.scoreFraction}>
            {score} de {totalQuestions} questões corretas
          </Text>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${percentage}%`,
                  backgroundColor: performance.color
                }
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.userInfoCard}>
        <Text style={styles.cardTitle}>Informações do Participante</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>👤 Nome:</Text>
          <Text style={styles.infoValue}>{userName}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📧 E-mail:</Text>
          <Text style={styles.infoValue}>{userEmail}</Text>
        </View>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>Estatísticas</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{score}</Text>
            <Text style={styles.statLabel}>Acertos</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#ef4444' }]}>
              {totalQuestions - score}
            </Text>
            <Text style={styles.statLabel}>Erros</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalQuestions}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: performance.color }]}
        onPress={handleRestartQuiz}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Fazer Novo Quiz</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Obrigado por participar! 🎯
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  scoreCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 32,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 12,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scorePercentage: {
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scoreFraction: {
    fontSize: 18,
    color: '#6b7280',
    fontWeight: '500',
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  userInfoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  button: {
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6b7280',
    marginTop: 24,
    fontWeight: '500',
  },
});

