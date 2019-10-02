/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import {
  Container,
  Header,
  Name,
  Bio,
  Avatar,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  }

  // eslint-disable-next-line react/state-in-constructor
  state = {
    stars: [],
    loading: true,
    refreshing: false,
    page: 1,
  };

  async componentDidMount() {
    this.loadList();
  }

  loadList = async (page = 1) => {
    const { stars } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    this.setState({ refreshing: page >= 2 && true });

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    });

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      page,
      refreshing: false,
      loading: false,
    });
  }

  loadMore = () => {
    const { page } = this.state;

    const nextPage = page + 1;

    this.loadList(nextPage);
  }

  refreshList = () => {
    this.setState({ refreshing: true, stars: [] }, this.loadList);
  }

  handleNavigate = (repository) => {
    const { navigation } = this.props;

    navigation.navigate('Repository', { repository });
  }

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const { stars, loading, refreshing } = this.state;

    return (
      <Container>
        <Header loading={loading}>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (<Loading color="#7159c1" size={90} />) : (<Stars
          onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
          refreshing={refreshing}
          onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
          onEndReached={this.loadMore} // Função que carrega mais itens
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred onPress={() => this.handleNavigate(item)}>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />)}
      </Container>
    );
  }
}

